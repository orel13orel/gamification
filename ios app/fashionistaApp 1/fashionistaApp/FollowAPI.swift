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
import FirebaseFunctions

class FollowAPI {
    var Ref_Follow = Database.database().reference().child("followers")
    var Ref_Following = Database.database().reference().child("following")
    
    var functions = Functions.functions()

    
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
        
        var text =  Auth.auth().currentUser?.uid
        self.functions.httpsCallable("addUserActivityApp").call(["text":text!+"/-LbvWyZ2Di1p1jo3pOZR/-LbvV5DHAybGUXNPS-0E"]) { (result, error) in
            if let error = error as NSError? {
                if error.domain == FunctionsErrorDomain {
                    let code = FunctionsErrorCode(rawValue: error.code)
                    let message = error.localizedDescription
                    let details = error.userInfo[FunctionsErrorDetailsKey]
                }
                
            }
            if let text = (result?.data as? [String:Any])? ["text"] as? String {
                //   SignUpBtn.
                
                let    str = text
            }
        }
        
        var id1 = id as? String
        self.functions.httpsCallable("addUserActivityApp").call(["text":id1!+"/-LbvX84LDLtxAgUSQ375/-LbvV5DHAybGUXNPS-0E"]) { (result, error) in
            if let error = error as NSError? {
                if error.domain == FunctionsErrorDomain {
                    let code = FunctionsErrorCode(rawValue: error.code)
                    let message = error.localizedDescription
                    let details = error.userInfo[FunctionsErrorDetailsKey]
                }
                
            }
            if let text = (result?.data as? [String:Any])? ["text"] as? String {
                //   SignUpBtn.
                
                let    str = text
            }
        }
        
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
        
        var text =  Auth.auth().currentUser?.uid
        self.functions.httpsCallable("addUserActivityApp").call(["text":text!+"/-LbvXSwreFP_tXRRn_m7/-LbvV5DHAybGUXNPS-0E"]) { (result, error) in
            if let error = error as NSError? {
                if error.domain == FunctionsErrorDomain {
                    let code = FunctionsErrorCode(rawValue: error.code)
                    let message = error.localizedDescription
                    let details = error.userInfo[FunctionsErrorDetailsKey]
                }
                
            }
            if let text = (result?.data as? [String:Any])? ["text"] as? String {
                //   SignUpBtn.
                
                let    str = text
            }
        }
        
        var id1 = id as? String
        self.functions.httpsCallable("addUserActivityApp").call(["text":id1!+"/-LbvXsMOsiiQ0yYn8dfp/-LbvV5DHAybGUXNPS-0E"]) { (result, error) in
            if let error = error as NSError? {
                if error.domain == FunctionsErrorDomain {
                    let code = FunctionsErrorCode(rawValue: error.code)
                    let message = error.localizedDescription
                    let details = error.userInfo[FunctionsErrorDetailsKey]
                }
                
            }
            if let text = (result?.data as? [String:Any])? ["text"] as? String {
                //   SignUpBtn.
                
                let    str = text
            }
        }
        
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
    
    func fetchCountFollowing(userId: String, completion: @escaping (Int) -> Void) {
        Ref_Following.child(userId).observe(.value) { (snapshot) in
            let count = Int(snapshot.childrenCount)
            completion(count)
        }
    }
    
    func fetchCountFollowers(userId: String, completion: @escaping (Int) -> Void) {
       Ref_Follow.child(userId).observe(.value) { (snapshot) in
            let count = Int(snapshot.childrenCount)
            completion(count)
        }
    }
    
}
