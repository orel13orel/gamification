//
//  SignUpViewController.swift
//  fashionistaApp
//
//  Created by Studio on 11/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import UIKit
import FirebaseAuth
import FirebaseDatabase
import FirebaseStorage
import ProgressHUD
import  FirebaseFunctions


class SignUpViewController: UIViewController {
    
    @IBOutlet weak var FullNameTextField: UITextField!
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var EmailAddressTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var profilePicture: UIImageView!
    
    @IBOutlet weak var SignUpBtn: UIButton!
    
    
    var functions = Functions.functions()

    
    var selectedImage: UIImage?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        profilePicture.layer.cornerRadius = 40
        profilePicture.clipsToBounds = true
        
        let TapGesture = UITapGestureRecognizer(target: self, action: #selector(self.SelectImageView))
        profilePicture.addGestureRecognizer(TapGesture)
        profilePicture.isUserInteractionEnabled = true
        
        SignUpBtn.isEnabled = false
        HandleTextField()
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        view.endEditing(true)
    }
    
    func HandleTextField() {
        FullNameTextField.addTarget(self, action: #selector(self.textFieldchanged), for: UIControlEvents.editingChanged)
        usernameTextField.addTarget(self, action: #selector(self.textFieldchanged), for: UIControlEvents.editingChanged)
        EmailAddressTextField.addTarget(self, action: #selector(self.textFieldchanged), for: UIControlEvents.editingChanged)
        passwordTextField.addTarget(self, action: #selector(self.textFieldchanged), for: UIControlEvents.editingChanged)
        
    }
    
    @objc func textFieldchanged() {
        guard let fullName = FullNameTextField.text, !fullName.isEmpty, let username = usernameTextField.text, !username.isEmpty, let email = EmailAddressTextField.text, !email.isEmpty, let password = passwordTextField.text, !password.isEmpty      else {
            SignUpBtn.setTitleColor(UIColor.white, for: UIControlState.normal)
            SignUpBtn.isEnabled = false
            return
        }
        SignUpBtn.setTitleColor(UIColor.black, for: UIControlState.normal)
        SignUpBtn.isEnabled = true
    }
    
    @objc func SelectImageView() {
        let PickImageController = UIImagePickerController()
        PickImageController.allowsEditing = true
        PickImageController.delegate = self
        present(PickImageController, animated: true, completion: nil)
    }
    
    @IBAction func dismiss_onClick(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    
    @IBAction func CreateMyAccount(_ sender: Any) {
        view.endEditing(true)
        ProgressHUD.show("waiting", interaction: false)
        if let profileImage = self.selectedImage, let imageData = UIImageJPEGRepresentation(profileImage, 0.1) {
            AuthenticationService.SignUpMethod(fullName: FullNameTextField.text!, username: usernameTextField.text!, email: EmailAddressTextField.text!, password: passwordTextField.text!, imageData: imageData, onSuccess: {
                ProgressHUD.showSuccess("welcome :)")
                self.performSegue(withIdentifier: "SignUpToTabBarVC", sender: nil)
                
                var text =  Auth.auth().currentUser?.uid
                self.functions.httpsCallable("addUserActivityApp").call(["text":text!+"/-LbvVxMksG0pZr6T3aQJ/-LbvUlLRn6ElLrj62YSS"]) { (result, error) in
                    if let error = error as NSError? {
                        if error.domain == FunctionsErrorDomain {
                            let code = FunctionsErrorCode(rawValue: error.code)
                            let message = error.localizedDescription
                            let details = error.userInfo[FunctionsErrorDetailsKey]
                        }
                        
                    }
                    if let text = (result?.data as? [String:Any])? ["text"] as? String {
                        //   SignUpBtn.
                        
                        let    str = text
                    }
                }
                
            }, onError: { (errorString) in
                ProgressHUD.showError(errorString!)
            })
        } else {
            ProgressHUD.showError("profile picture can not be empty")
        }
    }
    
    
}
extension SignUpViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        print("did finish")
        if let image = info["UIImagePickerControllerOriginalImage"] as? UIImage {
            selectedImage = image
            profilePicture.image = image
        }
        dismiss(animated: true, completion: nil)
    }
}
