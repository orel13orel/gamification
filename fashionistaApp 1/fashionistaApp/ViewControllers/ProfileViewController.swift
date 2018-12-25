//
//  ProfileViewController.swift
//  fashionistaApp
//
//  Created by Studio on 11/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import UIKit
import FirebaseAuth

class ProfileViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func LogOutAction(_ sender: Any) {
        do {
            try Auth.auth().signOut()
        }catch let logoutError {
            print(logoutError)
        }
        let storyboard = UIStoryboard.init(name: "Main", bundle: nil)
        let signinVC = storyboard.instantiateViewController(withIdentifier: "SignInViewController")
        self.present(signinVC, animated: true, completion: nil)
    }
}
