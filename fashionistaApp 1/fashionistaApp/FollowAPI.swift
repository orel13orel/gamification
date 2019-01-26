//
//  FollowAPI.swift
//  fashionistaApp
//
//  Created by admin on 06/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
import FirebaseDatabase
import FirebaseAuth

class FollowAPI {
    var Ref_Follow = Database.database().reference().child("followers")
    var Ref_Following = Database.database().reference().child("following")
    
    func followAction(withUser id: String) {

        API.Myposts.Ref_mypost.child(id).observeSingleEvent(of: .value) { (snapshot) in
            if let dict = snapshot.value as? [String: Any] {
                for key in dict.keys {
                    Database.database().reference().child("Feed").child(Auth.auth().currentUser!.uid).child(key).setValue(true)
                }
            }
        }
        Ref_Follow.child(id).child((Auth.auth().currentUser?.uid)!).setValue(true)
        Ref_Following.child((Auth.auth().currentUser?.uid)!).child(id).setValue(true)
    }
    
    func unfollowAction(withUser id: String) {
  
        API.Myposts.Ref_mypost.child(id).observeSingleEvent(of: .value) { (snapshot) in
            if let dict = snapshot.value as? [String: Any] {
                for key in dict.keys {
                    Database.database().reference().child("Feed").child(Auth.auth().currentUser!.uid).child(key).removeValue()
                }
            }
        }
        Ref_Follow.child(id).child((Auth.auth().currentUser?.uid)!).setValue(NSNull())
        Ref_Following.child((Auth.auth().currentUser?.uid)!).child(id).setValue(NSNull())
    }
    
    func Isfollowing(userId: String, completed: @escaping(Bool)->Void)  {
        Ref_Follow.child(userId).child(((Auth.auth().currentUser?.uid)!)).observeSingleEvent(of: .value) { (snapshot) in
            if let _ = snapshot.value as? NSNull {
                completed(false)
            } else {
                completed(true)
            }
        }
    }
}
