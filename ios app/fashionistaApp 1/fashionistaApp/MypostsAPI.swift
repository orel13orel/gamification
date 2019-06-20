//
//  MypostsAPI.swift
//  fashionistaApp
//
//  Created by admin on 05/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
import FirebaseDatabase

class MypostAPI {
    var Ref_mypost = Database.database().reference().child("Myposts")
    
    func fetchMyPosts(userId: String, completion: @escaping (String) -> Void) {
        Ref_mypost.child(userId).observe(.childAdded) { (snapshot) in
            completion(snapshot.key)
        }
    }
    
    func fetchCountMyPosts(userId: String, completion: @escaping (Int) -> Void ) {
        Ref_mypost.child(userId).observe(.value) { (snapshot) in
            let count = Int(snapshot.childrenCount)
            completion(count)
        }
    }
}

