//
//  ProfileViewController.swift
//  fashionistaApp
//
//  Created by Studio on 11/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import UIKit
import FirebaseAuth

class ProfileViewController: UIViewController {
    
    
    @IBOutlet weak var collectionView: UICollectionView!
     var user : User!
     var post : [Post] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        collectionView.dataSource = self
        collectionView.delegate = self
        fetchUser()
        fetchMyPost()
    }
    
    func fetchMyPost() {
        guard let currentUser = Auth.auth().currentUser else {
            return
        }
        API.Myposts.Ref_mypost.child(currentUser.uid).observe(.childAdded) { (snapshot) in
        API.Post.observePost(withId: snapshot.key , complete: { (post) in
                self.post.append(post)
                self.collectionView.reloadData()
            })
        }
    }
    
    func fetchUser() {
        API.User.ObserveCurrentUser { (user) in
           self.user = user
           self.title = user.Username
           self.collectionView.reloadData()
        }
    }
    
    @IBAction func LogOutAction(_ sender: Any) {
        do {
            try Auth.auth().signOut()
        }catch let logoutError {
            print(logoutError)
        }
        let storyboard = UIStoryboard.init(name: "Main", bundle: nil)
        let signinVC = storyboard.instantiateViewController(withIdentifier: "SignInViewController")
        self.present(signinVC, animated: true, completion: nil)
    }
    
    
}

extension ProfileViewController: UICollectionViewDataSource {
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
                 headerViewCell.delegate2 = self
        }
        return headerViewCell
    }
}

extension ProfileViewController: HeaderProfileCollectionReusableViewDelegateSwitchSettingVC{
    func goToSettingVC() {
        performSegue(withIdentifier: "Profile_SettingSegue", sender: nil)
    }
}

extension ProfileViewController: UICollectionViewDelegateFlowLayout {
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
