//
//  BadgeListTableViewCell.swift
//  fashionistaApp
//
//  Created by admin on 25/05/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
import FirebaseDatabase
import FirebaseAuth


class BadgeListTableViewCell: UITableViewCell {

    @IBOutlet weak var badgePhoto: UIImageView!
    @IBOutlet weak var BadgeNameLabel: UILabel!
    


    override func awakeFromNib() {
        super.awakeFromNib()
    }
  
  
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

    }

}
