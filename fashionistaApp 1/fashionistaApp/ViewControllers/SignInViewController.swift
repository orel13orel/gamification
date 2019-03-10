//
//  SignInViewController.swift
//  fashionistaApp
//
//  Created by Studio on 11/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import UIKit
import FirebaseAuth
import ProgressHUD
import FirebaseCore
import FirebaseFunctions

class SignInViewController: UIViewController {
    
    @IBOutlet weak var usernameTextField: UITextField!
    
    @IBOutlet weak var EmailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var SignInBtn: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        HandleTextField()
        
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        view.endEditing(true)
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        if Auth.auth().currentUser != nil {
            self.performSegue(withIdentifier: "SignInToTabBarVC", sender: nil)
        }
        
    }
    
    @IBAction func SignInButton(_ sender: Any) {
        view.endEditing(true)
        ProgressHUD.show("waiting", interaction: false)
        AuthenticationService.SignInMethod(email: EmailTextField.text!, password: passwordTextField.text!, onSuccess: {
            ProgressHUD.showSuccess("welcome back :)")
//            var functions = Functions.functions()
//            functions.httpsCallable("addMessage2").call(["text": inputField.text]) { (result, error) in
//                if let error = error as NSError? {
//                    if error.domain == FunctionsErrorDomain {
//                        let code = FunctionsErrorCode(rawValue: error.code)
//                        let message = error.localizedDescription
//                        let details = error.userInfo[FunctionsErrorDetailsKey]
//                    }
//                    // ...
//                }
//                if let text = (result?.data as? [String: Any])?["text"] as? String {
//                    self.resultField.text = text
//                }
//            }
        self.performSegue(withIdentifier: "SignInToTabBarVC", sender: nil)
        }, onError: { error in
            ProgressHUD.showError(error!)
        })
    }
    
    func HandleTextField() {
        EmailTextField.addTarget(self, action: #selector(self.textFieldchanged), for: UIControlEvents.editingChanged)
        passwordTextField.addTarget(self, action: #selector(self.textFieldchanged), for: UIControlEvents.editingChanged)
    }
    
    @objc func textFieldchanged() {
        guard let  email = EmailTextField.text, !email.isEmpty, let password = passwordTextField.text, !password.isEmpty      else {
            SignInBtn.setTitleColor(UIColor.white, for: UIControlState.normal)
            SignInBtn.isEnabled = false
            return
        }
        SignInBtn.setTitleColor(UIColor.black, for: UIControlState.normal)
        SignInBtn.isEnabled = true
    }
    
}
