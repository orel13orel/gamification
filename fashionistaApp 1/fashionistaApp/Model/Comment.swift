//
//  Comment.swift
//  fashionistaApp
//
//  Created by admin on 02/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation

class Comment{
    var commentText : String?
    var uid:String?
}


extension Comment {
    static func TransformComment(dict: [String: Any])-> Comment {
        let comment = Comment()
        comment.commentText = dict["commentText"] as? String
        comment.uid = dict["uid"] as? String
        return comment
    }
}
