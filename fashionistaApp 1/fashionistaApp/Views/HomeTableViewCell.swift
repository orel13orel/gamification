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
    
    var user: User? {
        didSet {
            setUserInfo()
            
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
        LabelName.text = user?.Username
        if let photoUrlString = user?.profilePicture {
            let photoUrl = URL(string: photoUrlString)
            ProfileImageView.sd_setImage(with: photoUrl, placeholderImage: UIImage(named: "placeholderImg"))
        }
    }
    
    override func prepareForReuse() {
        super.prepareForReuse()
        ProfileImageView.image =  UIImage(named: "placeholderImg")
    }
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        LabelName.text = ""
        CaptionLabel.text = ""
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

    }

}
