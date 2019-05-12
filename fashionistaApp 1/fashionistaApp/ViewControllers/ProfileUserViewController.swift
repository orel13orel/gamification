//
//  ProfileUserViewController.swift
//  fashionistaApp
//
//  Created by admin on 24/04/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit

class ProfileUserViewController: UIViewController {

    @IBOutlet weak var collectionView: UICollectionView!
    var user : User!
    var post : [Post] = []
    var userId = ""
    var delegate: HeaderProfileCollectionReusableViewDelegate?
    override func viewDidLoad() {
        super.viewDidLoad()
        print("userid: \(userId)")
        collectionView.dataSource = self
        collectionView.delegate = self
        fetchUser()
        fetchMyPost()
        
    }
    
    func fetchMyPost() {
        API.Myposts.fetchMyPosts(userId: userId) { (key) in
            API.Post.observePost(withId: key , complete: { (post) in
                self.post.append(post)
                self.collectionView.reloadData()
            })
        }
    }
    
    func Isfollowing(userId: String, completed: @escaping(Bool)->Void) {
        API.Follow.Isfollowing(userId: userId, completed: completed)
    }
    
    func fetchUser() {
        API.User.observeUser(withId: userId) { (user) in
            self.Isfollowing(userId: user.id!, completed: { (value) in
                user.isfollowing = value
                self.user = user
                self.navigationItem.title = user.Username   //navigationitem
                self.collectionView.reloadData()
            })
        }
    }
    
}

extension ProfileUserViewController: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return post.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "PhotoCollectionViewCell", for: indexPath) as! PhotoCollectionViewCell
        let posts = post[indexPath.row]
        cell.post = posts
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        let headerViewCell = collectionView.dequeueReusableSupplementaryView(ofKind: UICollectionElementKindSectionHeader, withReuseIdentifier: "HeaderProfileCollectionReusableView", for: indexPath) as! HeaderProfileCollectionReusableView
        if let user = self.user{
            headerViewCell.user = user
            headerViewCell.delegate = self.delegate
            headerViewCell.delegate2 = self
        }
        return headerViewCell
    }
}
extension ProfileUserViewController: HeaderProfileCollectionReusableViewDelegateSwitchSettingVC{
    func goToSettingVC() {
        performSegue(withIdentifier: "ProfileUser_SettingSegue", sender: nil)
    }
}



extension ProfileUserViewController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        return 2
    }
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        return 0
    }
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.size.width/3 - 1, height: collectionView.frame.size.height/3 - 1)
    }
}
