//
//  FollowAPI.swift
//  fashionistaApp
//
//  Created by admin on 06/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation
import FirebaseDatabase

class FollowAPI {
    var Ref_Following = Database.database().reference().child("following")
    var Ref_Follow = Database.database().reference().child("followers")
  //  var Ref_Following = Database.database().reference().child("following")
}
