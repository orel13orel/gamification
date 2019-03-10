//
//  ActivityTableViewCell.swift
//  fashionistaApp
//
//  Created by admin on 31/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit

//protocol ActivityTableViewCellDelegate {
//    func gotoDetailVC(postId: String)
//    func gotoProfileVC(postId: String)
//}

class ActivityTableViewCell: UITableViewCell {

    @IBOutlet weak var profileImage: UIImageView!
    @IBOutlet weak var label: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var photo: UIImageView!
    
  //  var delegate: ActivityTableViewCellDelegate?
    
    var notification: Notification? {
        didSet {
            updateView()
        }
    }
    
    var user: User? {
        didSet {
            setUserInfo()
            
        }
    }
    
    func updateView() {
        switch notification!.type! {
        case "feed":
            descriptionLabel.text = "added a new post"
            let postId = notification!.objectId!
            API.Post.observePost(withId: postId) { (post) in
                if let photoUrlString = post.photoUrl {
                   let photoUrl = URL(string: photoUrlString)
                   self.photo.sd_setImage(with: photoUrl, placeholderImage: UIImage(named: "placeholderImg"))
                }
            }
        default:
            print("")
        }
    }
    func setUserInfo() {
        label.text = user?.Username
        if let photoUrlString = user?.profilePicture {
            let photoUrl = URL(string: photoUrlString)
            profileImage.sd_setImage(with: photoUrl, placeholderImage: UIImage(named: "placeholderImg"))
        }
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
