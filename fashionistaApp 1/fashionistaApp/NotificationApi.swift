//
//  NotificationApi.swift
//  fashionistaApp
//
//  Created by admin on 29/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
import FirebaseDatabase
class NotificationApi {
    var REF_NOTIFICATION = Database.database().reference().child("notification")
    
    func ObserveNotification(withId id : String , completion: @escaping(Notification)-> Void) {
        
        REF_NOTIFICATION.child(id).observe(.childAdded) { (snapshot) in
            if let dict = snapshot.value as? [String: Any] {
                let newNoti = Notification.Transform(dict: dict, key: snapshot.key)
                completion(newNoti)
            }
        }
    }
    
}
