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
    
    var posts = [Post]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        TabView.estimatedRowHeight = 521
        TabView.rowHeight = UITableViewAutomaticDimension
        
        TabView.dataSource = self
        LoadPost()
    }
    
    func LoadPost() {
        Database.database().reference().child("Posts").observe(.childAdded) { (snapshot: DataSnapshot) in
            print(Thread.isMainThread)
            if let dict = snapshot.value as? [String: Any] {
                let NewPost = Post.TransformPostPhoto(dict: dict)
                self.posts.append(NewPost)
                self.TabView.reloadData()
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
        cell.post = post
        return cell
    }
}
