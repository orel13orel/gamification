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
       	 let newBadge = newUserRef.child("Badge")
        let newBadgeid = newBadge.childByAutoId().key
        let newBadgeRef = newBadge.child(newBadgeid!)
        
        
        newUserRef.setValue(["FullName" : fullName , "Username" : username , "Username_lowercase" : username.lowercased()  , "Email" : email , "Password" : password, "profilePicture" : profileimageurl,"SumOfPoints" : "0" ])
        newBadgeRef.setValue(["Caption" : "","PhotoUrl" : "" , ])
        onSuccess()
    }
}
