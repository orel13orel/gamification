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
        newPostRef.setValue(["uid": currentUserID, "photoUrl" : photoUrl, "caption" : caption] ) { (error, ref) in
            if error != nil {
                ProgressHUD.showError(error!.localizedDescription)
                return
            }
            Database.database().reference().child("Feed").child(Auth.auth().currentUser!.uid).child(newPostid!).setValue(true)
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
