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
        Database.database().reference().child("Posts").observe(.childAdded) { (snapshot: DataSnapshot) in
            print(Thread.isMainThread)
            if let dict = snapshot.value as? [String: Any] {
                let NewPost = Post.TransformPostPhoto(dict: dict)
                self.fetchUser(uid: NewPost.uid!, completed: {
                    self.posts.append(NewPost)
                    self.ActivityIndicator.stopAnimating()
                    self.TabView.reloadData()
                })
            }
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.tabBarController?.tabBar.isHidden = false
        
    }
    
    @IBAction func buttonTouch(_ sender: Any) {
        self.performSegue(withIdentifier: "commentSegue", sender: nil)
    }
    
    func fetchUser(uid:String,completed: @escaping () -> Void ){
 Database.database().reference().child("Users").child(uid).observeSingleEvent(of: DataEventType.value) { (Snapshot) in
            if let dict = Snapshot.value as? [String: Any] {
                let user = User.TransformUser(dict:dict)
                self.users.append(user)
                completed()
            }
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
        return cell
    }
}
