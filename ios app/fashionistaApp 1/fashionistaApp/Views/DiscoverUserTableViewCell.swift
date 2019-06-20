//
//  DiscoverUserTableViewCell.swift
//  fashionistaApp
//
//  Created by admin on 06/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
import FirebaseAuth

protocol DiscoverUserTableViewCellDelegate {
    func goToProfileUserVC(userId: String)
}

class DiscoverUserTableViewCell: UITableViewCell {

    @IBOutlet weak var ProfileImage: UIImageView!
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var followBTN: UIButton!
    
    var delegate : DiscoverUserTableViewCellDelegate?
    var user: User? {
        didSet {
            updateView()
        }
    }
    
    func updateView() {
       nameLabel.text = user?.Username
        if let photoUrlString = user?.profilePicture {
            let photoUrl = URL(string: photoUrlString)
            ProfileImage.sd_setImage(with: photoUrl, placeholderImage: UIImage(named: "placeholderImg"))
        }
        
        
        if user!.isfollowing! {
           configureUnFollowBtn()
       } else {
            configureFollowBtn()
        }
        
    }
    
    func configureFollowBtn() {
        followBTN.layer.borderWidth = 1
        followBTN.layer.borderColor = UIColor(red: 226/255, green: 228/255, blue: 232.255, alpha: 1).cgColor
        followBTN.layer.cornerRadius = 5
        followBTN.clipsToBounds = true
        
        followBTN.setTitleColor(UIColor.white, for: UIControlState.normal)
        followBTN.backgroundColor = UIColor(red: 69/255, green: 142/255, blue: 255/255, alpha: 1)
        followBTN.setTitle("Follow", for: UIControlState.normal)
        followBTN.addTarget(self, action: #selector(self.followAction), for: UIControlEvents.touchUpInside)
        
    }
    
    func configureUnFollowBtn() {
        followBTN.layer.borderWidth = 1
        followBTN.layer.borderColor = UIColor(red: 226/255, green: 228/255, blue: 232.255, alpha: 1).cgColor
        followBTN.layer.cornerRadius = 5
        followBTN.clipsToBounds = true
        
        followBTN.setTitleColor(UIColor.black, for: UIControlState.normal)
        followBTN.backgroundColor = UIColor.clear
        followBTN.setTitle("Following", for: UIControlState.normal)
        followBTN.addTarget(self, action: #selector(self.UnfollowAction), for: UIControlEvents.touchUpInside)
    }
    
    @objc func followAction() {
        if user!.isfollowing! == false {
            API.Follow.followAction(withUser: user!.id!)
            configureUnFollowBtn()
            user!.isfollowing! = true
        }
       
    }
    
    @objc func UnfollowAction() {
        if user!.isfollowing! == true {
            API.Follow.unfollowAction(withUser: user!.id!)
            configureFollowBtn()
            user!.isfollowing! = false
        }

    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        let TapGesture = UITapGestureRecognizer(target: self, action: #selector(self.nameLabel_Btn))
        nameLabel.addGestureRecognizer(TapGesture)
        nameLabel.isUserInteractionEnabled = true
    }
    
    @objc func nameLabel_Btn() {
        if let id = user?.id {
            delegate?.goToProfileUserVC(userId: id)
//            peopleVC?.performSegue(withIdentifier: "ProfileSegue", sender: id)
        }
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)


    }

}
