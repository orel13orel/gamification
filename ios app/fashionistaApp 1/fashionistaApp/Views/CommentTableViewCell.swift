//
//  CommentTableViewCell.swift
//  fashionistaApp
//
//  Created by admin on 02/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
protocol CommentTableViewCellDelegate {
    func goToProfileUserVC(userId: String)
}


class CommentTableViewCell: UITableViewCell {

    @IBOutlet weak var profileImageView: UIImageView!
    @IBOutlet weak var NameLabel: UILabel!
    @IBOutlet weak var CommentLabel: UILabel!
    
    var delegate: CommentTableViewCellDelegate?
    var comment: Comment? {
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
        CommentLabel.text = comment?.commentText
    }
    
    func setUserInfo(){
        NameLabel.text = user?.Username
        if let photoUrlString = user?.profilePicture {
            let photoUrl = URL(string: photoUrlString)
            profileImageView.sd_setImage(with: photoUrl, placeholderImage: UIImage(named: "placeholderImg"))
        }
    }
    

    override func awakeFromNib() {
        super.awakeFromNib()
        NameLabel.text = ""
        CommentLabel.text = ""
        let TapGestureForNameLabel = UITapGestureRecognizer(target: self, action: #selector(self.nameLabel_Btn))
        NameLabel.addGestureRecognizer(TapGestureForNameLabel)
        NameLabel.isUserInteractionEnabled = true
    }
    @objc func nameLabel_Btn() {
        if let id = user?.id {
            delegate?.goToProfileUserVC(userId: id)
        }
    }
    
    override func prepareForReuse() {
        super.prepareForReuse()
        profileImageView.image =  UIImage(named: "placeholderImg")
    }
    

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)


    }

}