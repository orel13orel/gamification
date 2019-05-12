//
//  HomeViewController.swift
//  fashionistaApp
//
//  Created by Studio on 11/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import UIKit
import FirebaseDatabase
import FirebaseAuth
import SDWebImage
import MessageUI
import ProgressHUD

class HomeViewController: UIViewController {
    
    @IBOutlet weak var TabView: UITableView!
    @IBOutlet weak var ActivityIndicator: UIActivityIndicatorView!
   
    var posts = [Post]()
    var users = [User]()
    var notifications = [Notification]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        TabView.estimatedRowHeight = 521
        TabView.rowHeight = UITableViewAutomaticDimension
        
        TabView.dataSource = self
        LoadPost()
       
    }
    
    @IBAction func EmailButtonTaped(_ sender: Any) {
        let inviteRef = API.Invite.REF_Invite
        let newInviteId = inviteRef.childByAutoId().key
        let newInviteRef = inviteRef.child(newInviteId!)
        guard let currentUser  = Auth.auth().currentUser else {
            return
        }
        let currentUserID = currentUser.uid
        
       newInviteRef.setValue(["uid": currentUserID, "InviteCount" : 0] ) { (error, ref) in
            if error != nil {
                ProgressHUD.showError(error!.localizedDescription)
                return
            }
        }
        
        let mailComposerViewController =  showMailComposer()
        if MFMailComposeViewController.canSendMail() {
            self.present(mailComposerViewController, animated: true, completion: nil)
        } else {
            self.showSendMailErrorAlert()
        }

    }
    
    func showMailComposer() -> MFMailComposeViewController {
      //  guard MFMailComposeViewController.canSendMail() else {
       //     return
    //    }
        
        let composer = MFMailComposeViewController()
        composer.mailComposeDelegate = self
        composer.setToRecipients([""])
        composer.setSubject("Invitation to Fashionista")
        composer.setMessageBody("Hello you have been invited  to join the app", isHTML: false)
        
        //present(composer,animated: true)
        return composer
    }
    
    func showSendMailErrorAlert() {
       let sendMailErrorAlert = UIAlertView(title: "Could not send email", message: "your device could not send email. please check email configuration and try again", delegate: self, cancelButtonTitle: "ok")
        sendMailErrorAlert.show()
    }
    func mailComposeController(_ controller: MFMailComposeViewController, didFinishWith result: MFMailComposeResult, error: Error?) {
        switch result.rawValue {
        case MFMailComposeResult.cancelled.rawValue:
            print("cancelled mail")
        case MFMailComposeResult.sent.rawValue:
            print("mail sent")
        default:
            break
        }
        self.dismiss(animated: true, completion: nil)
    }
    
    func LoadPost() {

       API.Feed.ObserveFeed(withId: Auth.auth().currentUser!.uid) { (post) in
            guard let postId = post.uid else {
                return
            }
                self.fetchUser(uid: postId, completed: {
                self.posts.insert(post, at: 0)
                self.TabView.reloadData()
            })
        }
        API.Feed.ObserveFeedRemove(withId: Auth.auth().currentUser!.uid) { (post) in
            self.posts = self.posts.filter {$0.id != post.id}
            self.users = self.users.filter { $0.id != post.uid}
            self.TabView.reloadData()
        }
    }
    
    
    func fetchUser(uid:String,completed: @escaping () -> Void ){
        API.User.observeUser(withId: uid) { (user) in
            self.users.insert(user, at: 0)
            completed()
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "LocationSegue"{
            let locationVc = segue.destination as! PostLocationViewController
            let postid = sender as! String
            locationVc.postId = postid
        }
        
        if segue.identifier == "CommentSegue" {
            let commentVc = segue.destination as! CommentViewController
            let postid = sender as! String
            commentVc.postId = postid
        }
        
        if segue.identifier == "Home_ProfileSegue" {
            let profileVC = segue.destination as! ProfileUserViewController
            let userid = sender as! String
            profileVC.userId = userid
        }
        
   
    }
    
}

extension HomeViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return posts.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "PostCell", for: indexPath) as! HomeTableViewCell
        let post = posts[indexPath.row]
        let user = users[indexPath.row]
        cell.user = user
        cell.post = post
        cell.delegate = self
        return cell
    }
    
}

extension HomeViewController: HomeTableViewCellDelegate {
    func goToLocationVC(postId: String) {
        performSegue(withIdentifier: "LocationSegue", sender: postId)
    }
    
    func goToCommentVC(postId: String) {
        performSegue(withIdentifier: "CommentSegue", sender: postId)
    }
    
    func goToProfileUserVC(userId: String) {
        performSegue(withIdentifier: "Home_ProfileSegue", sender: userId)
    }
}

extension HomeViewController: MFMailComposeViewControllerDelegate {
    
}
