//
//  PostAPI.swift
//  fashionistaApp
//
//  Created by admin on 03/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
import FirebaseDatabase


class PostAPI {
    var Ref_posts = Database.database().reference().child("Posts")
    
    func observePost(complete: @escaping (Post) -> Void) {
        Ref_posts.observe(.childAdded) { (snapshot: DataSnapshot) in
            if let dict = snapshot.value as? [String: Any] {
                let NewPost = Post.TransformPostPhoto(dict: dict,key: snapshot.key)
                complete(NewPost)
            }
        }
    }
    func observePost(withId id : String, complete: @escaping (Post) -> Void){
        Ref_posts.child(id).observeSingleEvent(of: DataEventType.value) { (snapshot) in
            if let dict = snapshot.value as? [String: Any] {
                let post = Post.TransformPostPhoto(dict: dict, key: snapshot.key)
                complete(post)
            }
        }
    }
}
