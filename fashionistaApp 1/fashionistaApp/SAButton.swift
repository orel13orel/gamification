//
//  SAButton.swift
//  fashionistaApp
//
//  Created by admin on 29/04/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
import UIKit

class SAButton: UIButton {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupButton()
    }
    
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupButton()
    }
    
    
    private func setupButton() {
        setTitleColor(.white, for: .normal)
        backgroundColor     = UIColor(red: 255/255, green: 5/255, blue: 41/255, alpha: 1.0)
        titleLabel?.font    = .boldSystemFont(ofSize: 20)
        layer.cornerRadius  = frame.size.height / 2
    }
}

