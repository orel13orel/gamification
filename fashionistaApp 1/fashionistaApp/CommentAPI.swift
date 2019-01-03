//
//  CommentAPI.swift
//  fashionistaApp
//
//  Created by admin on 03/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
import FirebaseDatabase

class CommentAPI {
    var Ref_comments = Database.database().reference().child("Comments")
    
    func observeComments(withPostId id: String,complete: @escaping (Comment) -> Void) {
        Ref_comments.child(id).observeSingleEvent(of: .value) { (snapshot) in
            if let dict = snapshot.value as? [String: Any] {
                let NewComment = Comment.TransformComment(dict: dict)
                complete(NewComment)
            }
        }
    }
}