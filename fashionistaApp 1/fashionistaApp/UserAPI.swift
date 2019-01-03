//
//  UserAPI.swift
//  fashionistaApp
//
//  Created by admin on 03/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
import FirebaseDatabase

class UserAPI {
    var Ref_users = Database.database().reference().child("Users")
    
    func observeUser(withId uid: String, complete: @escaping (User) -> Void) {
        Ref_users.child(uid).observeSingleEvent(of: .value) { (snapshot) in
            if let dict = snapshot.value as? [String: Any] {
                let user = User.TransformUser(dict:dict)
                complete(user)
            }
        }
    }
}
