//
//  PhotoCollectionViewCell.swift
//  fashionistaApp
//
//  Created by admin on 06/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit

class PhotoCollectionViewCell: UICollectionViewCell {
    @IBOutlet weak var photos: UIImageView!
    
    var post: Post? {
      didSet {
        updateView()
     }
   }
    
    func updateView() {
        if let photoUrlString = post?.photoUrl {
            let photoUrl = URL(string: photoUrlString)
            photos.sd_setImage(with: photoUrl)
        }
    }
}
