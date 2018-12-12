//
//  SignUpViewController.swift
//  fashionistaApp
//
//  Created by Studio on 11/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import UIKit
import  FirebaseAuth
class SignUpViewController: UIViewController {

    @IBOutlet weak var FullNameTextField: UITextField!
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var EmailAddressTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var profilePicture: UIImageView!
    override func viewDidLoad() {
        super.viewDidLoad()

        profilePicture.layer.cornerRadius = 40
        profilePicture.clipsToBounds = true
        // Do any additional setup after loading the view.
    }

    @IBAction func dismiss_onClick(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
  
    @IBAction func CreateMyAccount(_ sender: Any) {
        Auth.auth().createUser(withEmail: "user@gmail.com", password: "123456") { (user: AuthDataResult?, error: Error?) in
            if error != nil {
                print(error?.localizedDescription)
                return
            }
            print(user)
        }
    }
    /*@IBAction func signUpBtn(_ sender: Any) {
        Auth.auth().createUser(withEmail: "user@gmail.com", password: "123456" , completion:  { (user: AuthDataResult?, error: Error?) in
            if error != nil {
                print(error?.localizedDescription)
                return
            }
            print(user)
        })
}*/
    
}
