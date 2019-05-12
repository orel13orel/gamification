//
//  SettingTableViewController.swift
//  fashionistaApp
//
//  Created by admin on 28/04/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
import ProgressHUD
class SettingTableViewController: UITableViewController {

    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var profileImageView: UIImageView!
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.title =  "Edit Profile"
        fetchCurrentUser()
    }
    
    func fetchCurrentUser(){
        API.User.ObserveCurrentUser { (user) in
            self.usernameTextField.text = user.Username
            self.emailTextField.text = user.Email
            if let profileUrl = URL(string: user.profilePicture!){
                  self.profileImageView.sd_setImage(with: profileUrl)
            }
          
        }
    }
    
    
    @IBAction func saveBtn_TouchUpInside(_ sender: Any) {
        view.endEditing(true)
        if let profileImage = self.profileImageView.image,  let imageData = UIImageJPEGRepresentation(profileImage, 0.1) {
            ProgressHUD.show("Waiting...")
            AuthenticationService.updateUserInfo(username: usernameTextField.text!, email: emailTextField.text!, imageData: imageData, onSuccess: {
                ProgressHUD.showSuccess("Success")
            }) { (errorMessage) in
                ProgressHUD.showError(errorMessage)
            }
        }
    }
    

    
    @IBAction func changeProfileBtn_TouchUpInside(_ sender: Any) {
        let PickImageController = UIImagePickerController()
        PickImageController.allowsEditing = true
        PickImageController.delegate = self
        present(PickImageController, animated: true, completion: nil)
    }
    
}

extension SettingTableViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        print("did finish")
        if let image = info["UIImagePickerControllerOriginalImage"] as? UIImage {
            profileImageView.image = image
        }
        dismiss(animated: true, completion: nil)
    }
}
