//
//  MyChallenges.swift
//  fashionistaApp
//
//  Created by admin on 02/06/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
import FirebaseDatabase

class MyChallenges {
    
      var Ref_mychallenges = Database.database().reference().child("Users")
    
    func fetchMychallenges(userId: String, completion: @escaping (String) -> Void) {
        Ref_mychallenges.child(userId).observe(.value) { (snapshot) in
            let Ref_users_challenges = self.Ref_mychallenges.child(userId).child("ProgressInChallenges")
            Ref_users_challenges.observeSingleEvent(of: .value, with: { (snapshot2) in
                let actionInChallenge = snapshot2.key
                print(actionInChallenge)

            })
        }
    }
}
