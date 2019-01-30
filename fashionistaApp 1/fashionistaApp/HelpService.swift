//
//  HelpService.swift
//  fashionistaApp
//
//  Created by admin on 26/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//
import FirebaseDatabase
import FirebaseAuth
import FirebaseStorage
import ProgressHUD
import Foundation

class HelpService {
    
    static func uploadToserver(data: Data , caption: String , onSuccess: @escaping ()-> Void){
             let photoIDstring = NSUUID().uuidString
                let storageRef = Storage.storage().reference(forURL: configuration.Conf_storage_root).child("Posts").child(photoIDstring)
      
        storageRef.putData(data, metadata: nil) { (metadata, error) in
            if error != nil {
                ProgressHUD.showError(error!.localizedDescription)
                return
            }
            storageRef.downloadURL(completion: { (url: URL?, error: Error?) in
                let photoUrl = url?.absoluteString
                self.sendDataToDatabase(photoUrl : photoUrl!, caption: caption , onSuccess: onSuccess)
        })
    }
   
}
    
    static func sendDataToDatabase(photoUrl : String , caption : String , onSuccess: @escaping ()-> Void) {
        let newPostid = API.Post.Ref_posts.childByAutoId().key
        let newPostRef = API.Post.Ref_posts.child(newPostid!)
        guard let currentUser = Auth.auth().currentUser else {
            return
        }
        let currentUserID = currentUser.uid
        newPostRef.setValue(["uid": currentUserID, "photoUrl" : photoUrl, "caption" : caption, "LikeCount" : 0] ) { (error, ref) in
            if error != nil {
                ProgressHUD.showError(error!.localizedDescription)
                return
            }
            Database.database().reference().child("Feed").child(Auth.auth().currentUser!.uid).child(newPostid!).setValue(true)
      
            
            API.Follow.Ref_Follow.child((Auth.auth().currentUser?.uid)!).observeSingleEvent(of: .value, with: { (snapshot) in
                let arraySnapshot = snapshot.children.allObjects as! [DataSnapshot]
                arraySnapshot .forEach({ (child) in
                    print(child.key)
                       API.Feed.REF_FEED.child(child.key).updateChildValues(["\(newPostid)" : true])
                       let newNotificationId = API.Notification.REF_NOTIFICATION.child(child.key).childByAutoId().key
                       let newNotificationRef = API.Notification.REF_NOTIFICATION.child(child.key).child(newNotificationId!)
                    newNotificationRef.setValue(["from": Auth.auth().currentUser!.uid, "type": "feed", "objectId": newPostid])
                })
            })
            
            let Mypost_ref = API.Myposts.Ref_mypost.child(currentUserID).child(newPostid!)
            Mypost_ref.setValue(true, withCompletionBlock: { (error, ref) in
                if error != nil {
                    ProgressHUD.showError(error!.localizedDescription)
                    return
                }
            })
            ProgressHUD.showSuccess("Success")
            onSuccess()
        }
    }
    


}
