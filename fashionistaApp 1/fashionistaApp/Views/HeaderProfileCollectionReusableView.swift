//
//  HeaderProfileCollectionReusableView.swift
//  fashionistaApp
//
//  Created by admin on 05/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
class HeaderProfileCollectionReusableView: UICollectionReusableView {
  
    @IBOutlet weak var profileImage: UIImageView!
    @IBOutlet weak var NameLabel: UILabel!
    @IBOutlet weak var PostCountLabel: UILabel!
    @IBOutlet weak var followingCountLabel: UILabel!
    @IBOutlet weak var followerCounterLabel: UILabel!
    
    
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
      
    }
}
