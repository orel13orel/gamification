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
    var Ref_post_comments = Database.database().reference().child("Myposts")
    
    /*func observeComments(withPostId id: String,complete: @escaping (Comment) -> Void) {
     Ref_comments.child(id).observeSingleEvent(of: .value) { (snapshot) in
     if let dict = snapshot.value as? [String: Any] {
     let NewComment = Comment.TransformComment(dict: dict)
     complete(NewComment)
            }
        }
    }*/
}
