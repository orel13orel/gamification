//
//  Invite.swift
//  fashionistaApp
//
//  Created by admin on 29/04/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation

class Invite{
    var InviteCount : Int?
    var uid:String?
}


extension Invite {
    static func TransformInvite(dict: [String: Any])-> Invite {
        let invite = Invite()
        invite.InviteCount = dict["InviteCount"] as? Int
        invite.uid = dict["uid"] as? String
        return invite
    }
}
