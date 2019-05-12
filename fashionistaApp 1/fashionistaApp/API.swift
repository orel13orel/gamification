//
//  API.swift
//  fashionistaApp
//
//  Created by admin on 03/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
struct API {
    static var User = UserAPI()
    static var Post = PostAPI()
    static var Comment = CommentAPI()
    static var Post_Comment = PostCommentAPI()
    static var Myposts = MypostAPI()
    static var Follow = FollowAPI()
    static var Feed = FeedAPI()
    static var Notification = NotificationApi()
    static var Invite = InviteAPI()
}
