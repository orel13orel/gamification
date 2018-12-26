//
//  Post.swift
//  fashionistaApp
//
//  Created by admin on 25/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import Foundation


class Post{
    
    var caption : String?
    var photoUrl : String?
    var uid:String?
    
}

extension Post {
    static func TransformPostPhoto(dict: [String: Any])-> Post {
        let post = Post()
        post.caption = dict["caption"] as? String
        post.photoUrl = dict["photoUrl"] as? String
               post.uid = dict["uid"] as? String
        return post
    }
}
