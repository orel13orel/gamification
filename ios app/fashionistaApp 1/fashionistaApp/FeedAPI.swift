//
//  FeedAPI.swift
//  fashionistaApp
//
//  Created by admin on 26/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import FirebaseDatabase
import Foundation

class FeedAPI {
    var REF_FEED = Database.database().reference().child("Feed")
    
    func ObserveFeed(withId id : String , completion: @escaping(Post)-> Void) {
        
        REF_FEED.child(id).observe(.childAdded) { (snapshot) in
            let key = snapshot.key
            API.Post.observePost(withId: key, complete: { (post) in
                completion(post)
            })
        }
    }
    
    func ObserveFeedRemove(withId id: String, completion: @escaping(Post)-> Void) {
        REF_FEED.child(id).observe(.childRemoved, with: { (snapshot) in
            let key = snapshot.key
            API.Post.observePost(withId: key, complete: { (post) in
                completion(post)
            })
            //    completion(key)
            })
        }
}
