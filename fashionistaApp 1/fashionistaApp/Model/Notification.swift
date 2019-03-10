//
//  Notification.swift
//  fashionistaApp
//
//  Created by admin on 29/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
import FirebaseAuth
class Notification {

var from : String?
var objectId : String?
var type: String?
var id: String?
}

extension Notification {
    static func Transform(dict: [String: Any],key: String)-> Notification {
        let notification = Notification()
        notification.id = key
        notification.objectId = dict["objectId"] as? String
        notification.type = dict["type"] as? String
        notification.from = dict["from"] as? String
        return notification
    }
}
