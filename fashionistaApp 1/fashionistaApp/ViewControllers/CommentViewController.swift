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
    @IBOutlet weak var TableView: UITableView!
    @IBOutlet weak var constraintToBottom: NSLayoutConstraint!
    
    var postId: String!
    var comments = [Comment]()
    var users = [User]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Comment"
        TableView.dataSource = self
        TableView.estimatedRowHeight = 77
        TableView.rowHeight = UITableViewAutomaticDimension
        empty()
        HandleTextField()
        LoadComments()
        
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillShow(_ :)), name: NSNotification.Name.UIKeyboardWillShow, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillHide(_ :)), name: NSNotification.Name.UIKeyboardWillHide, object: nil)
        
        
        
        let tap = UITapGestureRecognizer(target: self.view, action: #selector(UIView.endEditing(_:)))
        tap.cancelsTouchesInView = false
        self.view.addGestureRecognizer(tap)
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }
    
    @objc func keyboardWillShow(_ notification : NSNotification) {
        //print(notification)
        let keyboardFrame = (notification.userInfo?[UIKeyboardFrameEndUserInfoKey] as AnyObject).cgRectValue
        UIView.animate(withDuration: 0.3) {
            self.constraintToBottom.constant = keyboardFrame!.height
            self.view.layoutIfNeeded()
        }
    }
    
    @objc func keyboardWillHide(_ notification : NSNotification) {
        //  print(notification)
        UIView.animate(withDuration: 0.3) {
            self.constraintToBottom.constant = 0
            self.view.layoutIfNeeded()
        }
    }
    
    func LoadComments(){
        API.Post_Comment.Ref_post_comments.child(self.postId).observe(.childAdded) { (snapshot) in
            API.Comment.observeComments(withPostId: snapshot.key, complete: { (comment) in
                self.fetchUser(uid: comment.uid!, completed: {
                    self.comments.append(comment)
                    self.TableView.reloadData()
                })
            })
        }
    }
    
    func fetchUser(uid:String,completed: @escaping () -> Void ){
        API.User.observeUser(withId: uid) { (user) in
            self.users.append(user)
            completed()
        }
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
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.tabBarController?.tabBar.isHidden = false
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    @IBAction func SendCommendBtn(_ sender: Any) {
        let commentRef = API.Comment.Ref_comments
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
            let postCommentsRef =  API.Post_Comment.Ref_post_comments.child(self.postId).child(newCommentId!)
            postCommentsRef.setValue(true, withCompletionBlock: { (error, ref) in
                if error != nil {
                    ProgressHUD.showError(error!.localizedDescription)
                    return
                }
            })
            self.empty()
            self.view.endEditing(true)
        }
    }
    
    func empty() {
        self.commentTextField.text = ""
        self.sendBtn.isEnabled = false
        self.sendBtn.setTitleColor(UIColor.lightGray, for: UIControlState.normal)
    }
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "Comment_ProfileSegue" {
            let profileVC = segue.destination as! ProfileUserViewController
            let userid = sender as! String
            profileVC.userId = userid
        }
    }
}

extension CommentViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return comments.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "CommentCell", for: indexPath) as! CommentTableViewCell
        let comment = comments[indexPath.row]
        let user = users[indexPath.row]
        cell.user = user
        cell.comment = comment
        cell.delegate = self
        return cell
    }
}

extension CommentViewController: CommentTableViewCellDelegate{
    func goToProfileUserVC(userId: String) {
        performSegue(withIdentifier: "Comment_ProfileSegue", sender: userId)
    }
}
