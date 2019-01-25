//
//  DiscoverUserTableViewCell.swift
//  fashionistaApp
//
//  Created by admin on 06/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
import FirebaseAuth

class DiscoverUserTableViewCell: UITableViewCell {

    @IBOutlet weak var ProfileImage: UIImageView!
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var followBTN: UIButton!
    
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
        
        //followBTN.addTarget(self, action: #selector(self.followAction), for: UIControlEvents.touchUpInside)
        followBTN.addTarget(self, action: #selector(self.UnfollowAction), for: UIControlEvents.touchUpInside)

    }
    
    @objc func followAction() {
        API.Follow.Ref_Follow.child(user!.id!).child((Auth.auth().currentUser?.uid)!).setValue(true)
        API.Follow.Ref_Following.child((Auth.auth().currentUser?.uid)!).child(user!.id!).setValue(true)

    }
    
    @objc func UnfollowAction() {
        API.Follow.Ref_Follow.child(user!.id!).child((Auth.auth().currentUser?.uid)!).setValue(NSNull())
        API.Follow.Ref_Following.child((Auth.auth().currentUser?.uid)!).child(user!.id!).setValue(NSNull())

    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
   
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)


    }

}
