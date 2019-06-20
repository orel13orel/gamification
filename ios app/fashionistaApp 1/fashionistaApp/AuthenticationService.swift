//
//  AuthenticationService.swift
//  fashionistaApp
//
//  Created by admin on 23/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import Foundation
import FirebaseAuth
import FirebaseStorage
import FirebaseDatabase

class AuthenticationService {
    
    static func SignInMethod(email: String, password: String, onSuccess: @escaping ()-> Void, onError: @escaping (_ errorMessage: String?)-> Void) {
        Auth.auth().signIn(withEmail: email, password: password) { (authResult, error) in
            if error != nil {
                onError(error!.localizedDescription)
                return
            }
            onSuccess()
        }
    }
    
    static func SignUpMethod(fullName: String, username: String, email: String, password: String, imageData: Data, onSuccess: @escaping ()-> Void, onError: @escaping (_ errorMessage: String?)-> Void) {
        Auth.auth().createUser(withEmail: email , password: password) { (authResult, error) in
            if error != nil {
                onError(error!.localizedDescription)
                return
            }
            
            let uid = authResult?.user.uid
            
            let storageRef = Storage.storage().reference(forURL: configuration.Conf_storage_root).child("profile_pictures").child(uid!)
            storageRef.putData(imageData, metadata: nil, completion: { (metadata, error) in
                if error != nil {
                    return
                }
                storageRef.downloadURL(completion: { (url: URL?, error: Error?) in
                    let profileimageurl = url?.absoluteString
                    self.SetUserInfo(profileimageurl: profileimageurl!, fullName: fullName, username: username, email: email , password: password, uid: uid!, onSuccess: onSuccess)
                })
            })
        }
    }
    static  func SetUserInfo(profileimageurl: String, fullName: String, username: String, email: String, password: String, uid: String, onSuccess: @escaping ()-> Void) {
        let ref = Database.database().reference()
        let usersRef = ref.child("Users")
        let newUserRef = usersRef.child(uid)
        newUserRef.setValue(["FullName" : fullName , "Username" : username , "Username_lowercase" : username.lowercased()  , "Email" : email , "Password" : password, "profilePicture" : profileimageurl,"Points" : "0" ])
        onSuccess()
    }
    
    
    static func updateUserInfo(username: String, email: String,  imageData: Data, onSuccess: @escaping ()-> Void, onError: @escaping (_ errorMessage: String?)-> Void) {
       
        Auth.auth().currentUser?.updateEmail(to: email, completion: { (error) in
            if error != nil {
                onError(error?.localizedDescription)
            } else {
                let uid = Auth.auth().currentUser?.uid
                let storageRef = Storage.storage().reference(forURL: configuration.Conf_storage_root).child("profile_pictures").child(uid!)
                storageRef.putData(imageData, metadata: nil, completion: { (metadata, error) in
                    if error != nil {
                        return
                    }
                    storageRef.downloadURL(completion: { (url: URL?, error: Error?) in
                        let profileimageurl = url?.absoluteString
                        
                        self.updateDatabase(profileimageurl: profileimageurl!, username: username, email: email, onSuccess: onSuccess, onError: onError)
                    })
                    
                })
            }
        })
    }
    
    
    static  func updateDatabase(profileimageurl: String, username: String, email: String,  onSuccess: @escaping ()-> Void, onError: @escaping (_ errorMessage: String?)-> Void) {
     
        let dict = ["Username" : username , "Username_lowercase" : username.lowercased()  , "Email" : email , "profilePicture" : profileimageurl ]
        API.User.Ref_users.child((Auth.auth().currentUser?.uid)!).updateChildValues(dict, withCompletionBlock: { (error,ref) in
            if error != nil {
              onError(error?.localizedDescription)
            } else {
              onSuccess()
            }
    })


    }
    
}
