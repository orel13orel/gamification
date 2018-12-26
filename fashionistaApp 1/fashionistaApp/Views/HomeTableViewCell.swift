//
//  HomeTableViewCell.swift
//  fashionistaApp
//
//  Created by admin on 26/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import UIKit

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
            print(post?.caption)
            updateView()
        }
    }
    
    func updateView() {
        CaptionLabel.text = post?.caption
        ProfileImageView.image = UIImage(named: "photo1.jpeg")
        LabelName.text = "kalanit"
        if let photoUrlString = post?.photoUrl {
            let photoUrl = URL(string: photoUrlString)
            PostImageView.sd_setImage(with: photoUrl)
        }
    }
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

    }

}
