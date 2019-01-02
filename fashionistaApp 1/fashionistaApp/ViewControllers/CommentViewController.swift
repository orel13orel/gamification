//
//  CommentViewController.swift
//  fashionistaApp
//
//  Created by admin on 02/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
import FirebaseDatabase
import FirebaseAuth
import ProgressHUD

class CommentViewController: UIViewController {

    @IBOutlet weak var commentTextField: UITextField!
    @IBOutlet weak var sendBtn: UIButton!
    

    override func viewDidLoad() {
        super.viewDidLoad()

        empty()
        HandleTextField()
    }
    
    func HandleTextField() {
        commentTextField.addTarget(self, action: #selector(self.textFieldchanged), for: UIControlEvents.editingChanged)
        
    }
    
    @objc func textFieldchanged() {
        if let commentText = commentTextField.text , !commentText.isEmpty {
            sendBtn.setTitleColor(UIColor.black, for: UIControlState.normal)
            sendBtn.isEnabled = true
            return
        }
        sendBtn.setTitleColor(UIColor.lightGray, for: UIControlState.normal)
        sendBtn.isEnabled = false
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.tabBarController?.tabBar.isHidden = true
    
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
 
    @IBAction func SendCommendBtn(_ sender: Any) {
        let ref = Database.database().reference()
        let commentRef = ref.child("Comments")
        let newCommentId = commentRef.childByAutoId().key
        let newCommentRef = commentRef.child(newCommentId!)
        guard let currentUser  = Auth.auth().currentUser else {
            return
        }
        let currentUserID = currentUser.uid
        newCommentRef.setValue(["uid": currentUserID, "commentText" : commentTextField.text!] ) { (error, ref) in
            if error != nil {
                ProgressHUD.showError(error!.localizedDescription)
                return
            }
            self.empty()
        }
    }
    
    func empty() {
        self.commentTextField.text = ""
        self.sendBtn.isEnabled = false
        self.sendBtn.setTitleColor(UIColor.lightGray, for: UIControlState.normal)

    }
    
}
