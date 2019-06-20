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
   
  func fetchMyBadges(userId: String, completion: @escaping (Int) -> Void) { 
    Ref_users.child(userId).observe(.value) { (snapshot) in
        let Ref_users_badges = self.Ref_users.child(userId).child("Badges")
                Ref_users_badges.observe(.value) { (snapshot2) in
                if snapshot2.exists(){
                    let count = Int(snapshot2.childrenCount)
                    completion(count)
                }else{
                    let count1 = 0
                    completion(count1)
                    }
                }
            }
        }
    
  
    func fetchMyPointsCount(userId: String, completion: @escaping (String) -> Void) {
        Ref_users.child(userId).observe(.value) { (snapshot) in
            if snapshot.hasChild("Points"){
                let points = snapshot.childSnapshot(forPath: "Points").value
                   completion(points as! String)
            }else{
                self.Ref_users.child(userId).updateChildValues(["Points": "0"])
                    completion("0")
            }
        }
    }
 

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
                    let user = User.TransformUser(dict:dict, key: child.key)
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
