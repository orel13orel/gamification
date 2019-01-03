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
        ActivityIndicator.startAnimating()
        API.Post.observePost { (post) in
            self.fetchUser(uid: post.uid!, completed: {
                self.posts.append(post)
                self.ActivityIndicator.stopAnimating()
                self.TabView.reloadData()
            })
        }
    }
    
    
    func fetchUser(uid:String,completed: @escaping () -> Void ){
        API.User.observeUser(withId: uid) { (user) in
            self.users.append(user)
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
