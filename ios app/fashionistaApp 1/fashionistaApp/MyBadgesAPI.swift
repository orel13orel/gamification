//
//  MyBadgesAPI.swift
//  fashionistaApp
//
//  Created by admin on 23/05/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
import FirebaseDatabase
class MyBadgesAPI {
    
      var Ref_mybadge = Database.database().reference().child("Users")
    
      func fetchMyBadges(userId: String, completion: @escaping (String) -> Void) {
            Ref_mybadge.child(userId).observe(.value) { (snapshot) in
            let Ref_users_badges = self.Ref_mybadge.child(userId).child("Badges")
                Ref_users_badges.observeSingleEvent(of: .value, with: { (snapshot3) in
                    for userId in (snapshot3.children){
                        let usersnap = userId as! DataSnapshot
                        let dict = usersnap.value as! [String: String?]
                        let name = dict["name"] as? String
                   //     print("\(String(describing: name))")
                  

                    }
                })
                Ref_users_badges.observe(.childAdded,with: {
                    snapshot1 in
                    completion(snapshot1.key)
                })
             }
         }
    
    func fetchCountMyBadges(userId: String, completion: @escaping (Int) -> Void) {
        Ref_mybadge.child(userId).observe(.value) { (snapshot) in
             let Ref_users_badges = self.Ref_mybadge.child(userId).child("Badges")
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
    
    
}




    
