//
//  UserAPI.swift
//  fashionistaApp
//
//  Created by admin on 03/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
import FirebaseDatabase
import FirebaseAuth

class UserAPI {
    var Ref_users = Database.database().reference().child("Users")
    
    func observeUser(withId uid: String, complete: @escaping (User) -> Void) {
        Ref_users.child(uid).observeSingleEvent(of: .value) { (snapshot) in
            if let dict = snapshot.value as? [String: Any] {
                let user = User.TransformUser(dict:dict, key: snapshot.key)
                complete(user)
            }
        }
    }
 
    func ObserveCurrentUser(complete: @escaping (User) -> Void) {
        guard let currentUser = Auth.auth().currentUser else {
            return
        }
        Ref_users.child(currentUser.uid).observeSingleEvent(of: .value) { (snapshot) in
            if let dict = snapshot.value as? [String: Any] {
                let user = User.TransformUser(dict:dict, key: snapshot.key)
                complete(user)
            }
        }
    }
    
    func ObserveUsers(complete: @escaping (User) -> Void) {
        Ref_users.observe(.childAdded) { (snapshot) in
            if let dict = snapshot.value as? [String: Any] {
                let user = User.TransformUser(dict:dict, key: snapshot.key)
                if user.id! != Auth.auth().currentUser?.uid {
                    complete(user)
                }
               // complete(user)
            }
        }
    }
    
    /*var CURRENT_USER: User? {
        if let CurrentUser = Auth.auth().currentUser {
            return CurrentUser.
        }
        return nil
    }*/
    
    func QuaryUser(withText text: String, complete: @escaping (User) -> Void) {
        Ref_users.queryOrdered(byChild: "Username_lowercase").queryStarting(atValue: text).queryEnding(atValue: text+"\u{f8ff}").queryLimited(toFirst: 10).observeSingleEvent(of: .value) { (snapshot) in
            snapshot.children.forEach({ (s) in
                let child = s as! DataSnapshot
                if let dict = child.value as? [String: Any] {
                    let user = User.TransformUser(dict:dict, key: snapshot.key)
                    if user.id! != Auth.auth().currentUser?.uid {
                        complete(user)
                    }
            }
        })
    }
    
    var Ref_currentUser: DatabaseReference? {
        guard let currentUser = Auth.auth().currentUser else {
            return nil
        }
        return Ref_users.child(currentUser.uid)
      }
    }
}
