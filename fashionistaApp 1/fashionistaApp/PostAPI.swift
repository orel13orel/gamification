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
}
