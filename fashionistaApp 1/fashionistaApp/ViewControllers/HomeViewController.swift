//
//  HomeViewController.swift
//  fashionistaApp
//
//  Created by Studio on 11/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import UIKit
import FirebaseDatabase
import FirebaseAuth
import SDWebImage

class HomeViewController: UIViewController {
    
    @IBOutlet weak var TabView: UITableView!
    @IBOutlet weak var ActivityIndicator: UIActivityIndicatorView!
   
    var posts = [Post]()
    var users = [User]()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        TabView.estimatedRowHeight = 521
        TabView.rowHeight = UITableViewAutomaticDimension
        
        TabView.dataSource = self
        LoadPost()
        
    }
    
    func LoadPost() {

       API.Feed.ObserveFeed(withId: Auth.auth().currentUser!.uid) { (post) in
            guard let postId = post.uid else {
                return
            }
                self.fetchUser(uid: postId, completed: {
                self.posts.insert(post, at: 0)
                self.TabView.reloadData()
            })
        }
        API.Feed.ObserveFeedRemove(withId: Auth.auth().currentUser!.uid) { (post) in
            self.posts = self.posts.filter {$0.id != post.id}
            self.users = self.users.filter { $0.id != post.uid}
            self.TabView.reloadData()
        }
    }
    
    
    func fetchUser(uid:String,completed: @escaping () -> Void ){
        API.User.observeUser(withId: uid) { (user) in
            self.users.insert(user, at: 0)
            completed()
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "CommentSegue" {
            let commentVc = segue.destination as! CommentViewController
            let postid = sender as! String
            commentVc.postId = postid
        }
    }
    
}

extension HomeViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return posts.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "PostCell", for: indexPath) as! HomeTableViewCell
        let post = posts[indexPath.row]
        let user = users[indexPath.row]
        cell.user = user
        cell.post = post
        cell.homeVC = self
        return cell
    }
}
