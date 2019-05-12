//
//  InviteAPI.swift
//  fashionistaApp
//
//  Created by admin on 29/04/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import FirebaseDatabase
import Foundation

class InviteAPI {
    var REF_Invite = Database.database().reference().child("Invites")

    func observeInvites(withinviteid id: String,complete: @escaping (Invite) -> Void) {
        REF_Invite.child(id).observeSingleEvent(of: .value) { (snapshot) in
            if let dict = snapshot.value as? [String: Any] {
                let newinvite = Invite.TransformInvite(dict: dict)
                complete(newinvite)
            }
        }
    }

}
