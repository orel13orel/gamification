//
//  HomeTableViewCell.swift
//  fashionistaApp
//
//  Created by admin on 26/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import UIKit
import FirebaseDatabase

class HomeTableViewCell: UITableViewCell {

    @IBOutlet weak var ProfileImageView: UIImageView!
    @IBOutlet weak var PostImageView: UIImageView!
    @IBOutlet weak var LabelName: UILabel!
    @IBOutlet weak var LikeImageView: UIImageView!
    @IBOutlet weak var CommentImageView: UIImageView!
    @IBOutlet weak var LikeCount: UIButton!
    @IBOutlet weak var CaptionLabel: UILabel!
    
    var post: Post? {
        didSet {
            updateView()
        }
    }
    
    func updateView() {
        CaptionLabel.text = post?.caption
        if let photoUrlString = post?.photoUrl {
            let photoUrl = URL(string: photoUrlString)
            PostImageView.sd_setImage(with: photoUrl)
        }
        setUserInfo()
    }
    
    func setUserInfo(){
        if let uid = post?.uid{
            Database.database().reference().child("Users").child(uid).observeSingleEvent(of: DataEventType.value) { (Snapshot) in
                if let dict = Snapshot.value as? [String: Any] {
                    let user = User.TransformUser(dict:dict)
                    self.LabelName.text = user.Username
                    if let photoUrlString = user.profilePicture {
                        let photoUrl = URL(string: photoUrlString)
                        self.ProfileImageView.sd_setImage(with: photoUrl)
                    }
                }
            }
        }
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

    }

}
