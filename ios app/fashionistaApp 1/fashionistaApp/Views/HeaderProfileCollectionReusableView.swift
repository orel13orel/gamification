//
//  HeaderProfileCollectionReusableView.swift
//  fashionistaApp
//
//  Created by admin on 05/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
import FirebaseAuth
import FirebaseDatabase

protocol HeaderProfileCollectionReusableViewDelegate {
    func updateFollowBtn(forUser user: User)
}

protocol HeaderProfileCollectionReusableViewDelegateSwitchSettingVC {
    func goToSettingVC()
}

class HeaderProfileCollectionReusableView: UICollectionReusableView {
  
    @IBOutlet weak var MyBadgeCountLabel: UILabel!
    @IBOutlet weak var MyPointsCountLabel: UILabel!
    @IBOutlet weak var profileImage: UIImageView!
    @IBOutlet weak var NameLabel: UILabel!
    @IBOutlet weak var PostCountLabel: UILabel!
    @IBOutlet weak var followingCountLabel: UILabel!
    @IBOutlet weak var followerCounterLabel: UILabel!
    @IBOutlet weak var followBtn: UIButton!
    
    var delegate: HeaderProfileCollectionReusableViewDelegate?
    var delegate2: HeaderProfileCollectionReusableViewDelegateSwitchSettingVC?
    var user : User? {
        didSet {
            updateView()
        }
    }
    func updateView() {
            self.NameLabel.text = user!.FullName
            if let photoUrlString = user!.profilePicture {
                let photoUrl = URL(string: photoUrlString)
                self.profileImage.sd_setImage(with: photoUrl)
            }
        
        API.Myposts.fetchCountMyPosts(userId: user!.id!) { (count) in
            self.PostCountLabel.text = "\(count)"

        }
        API.Follow.fetchCountFollowing(userId: user!.id!) { (count) in
            self.followingCountLabel.text = "\(count)"
        }
        API.Follow.fetchCountFollowers(userId: user!.id!) { (count) in
            self.followerCounterLabel.text = "\(count)"
        }
    
     API.User.fetchMyPointsCount(userId: user!.id!) { (count) in
         self.MyPointsCountLabel.text = "\(count)"
       }
     
        API.MyBadges.fetchCountMyBadges(userId: user!.id!) { (count) in
            self.MyBadgeCountLabel.text = "\(count)"
        }
    
        if user?.id == Auth.auth().currentUser?.uid {
            followBtn.setTitle("Edit Profile", for: UIControlState.normal)
           followBtn.addTarget(self, action: #selector(self.goToSettingVC), for: UIControlEvents.touchUpInside)
        } else {
            updateStateFollowBtn()
        }
    }
    @objc func goToSettingVC(){
        delegate2?.goToSettingVC()
    }
    
    func updateStateFollowBtn() {
        if user!.isfollowing! {
            configureUnFollowBtn()
        } else {
            configureFollowBtn()
        }
    }
    
    func configureFollowBtn() {
        followBtn.layer.borderWidth = 1
        followBtn.layer.borderColor = UIColor(red: 226/255, green: 228/255, blue: 232.255, alpha: 1).cgColor
        followBtn.layer.cornerRadius = 5
        followBtn.clipsToBounds = true
        
        followBtn.setTitleColor(UIColor.white, for: UIControlState.normal)
        followBtn.backgroundColor = UIColor(red: 69/255, green: 142/255, blue: 255/255, alpha: 1)
        followBtn.setTitle("Follow", for: UIControlState.normal)
        followBtn.addTarget(self, action: #selector(self.followAction), for: UIControlEvents.touchUpInside)
        
    }
    
    func configureUnFollowBtn() {
        followBtn.layer.borderWidth = 1
        followBtn.layer.borderColor = UIColor(red: 226/255, green: 228/255, blue: 232.255, alpha: 1).cgColor
        followBtn.layer.cornerRadius = 5
        followBtn.clipsToBounds = true
        
        followBtn.setTitleColor(UIColor.black, for: UIControlState.normal)
        followBtn.backgroundColor = UIColor.clear
        followBtn.setTitle("Following", for: UIControlState.normal)
        followBtn.addTarget(self, action: #selector(self.UnfollowAction), for: UIControlEvents.touchUpInside)
    }
    
    @objc func followAction() {
        if user!.isfollowing! == false {
            API.Follow.followAction(withUser: user!.id!)
            configureUnFollowBtn()
            user!.isfollowing! = true
            delegate?.updateFollowBtn(forUser: user!)
        }
        
    }
    
    @objc func UnfollowAction() {
        if user!.isfollowing! == true {
            API.Follow.unfollowAction(withUser: user!.id!)
            configureFollowBtn()
            user!.isfollowing! = false
            delegate?.updateFollowBtn(forUser: user!)

        }
        
    }
    
}
