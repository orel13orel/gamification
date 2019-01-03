//
//  Post.swift
//  fashionistaApp
//
//  Created by admin on 25/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import Foundation
import FirebaseAuth

class Post{
    
    var caption : String?
    var photoUrl : String?
    var uid: String?
    var id: String?
    var LikeCount : Int?
    var likes : Dictionary<String, Any>?
    var isLiked : Bool?
}

extension Post {
    static func TransformPostPhoto(dict: [String: Any],key: String)-> Post {
        let post = Post()
        post.id = key
        post.caption = dict["caption"] as? String
        post.photoUrl = dict["photoUrl"] as? String
        post.uid = dict["uid"] as? String
        post.LikeCount = dict["LikeCount"] as? Int
        post.likes = dict["likes"] as? Dictionary<String,Any>
        if let currentUserId = Auth.auth().currentUser?.uid{
            if post.likes != nil {
               post.isLiked = post.likes![currentUserId] != nil
                
            }
        }
        return post
    }
}
