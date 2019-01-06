//
//  DiscoverUserTableViewCell.swift
//  fashionistaApp
//
//  Created by admin on 06/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit

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
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
   
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)


    }

}
