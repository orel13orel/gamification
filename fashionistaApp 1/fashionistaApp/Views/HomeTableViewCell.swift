//
//  HomeTableViewCell.swift
//  fashionistaApp
//
//  Created by admin on 26/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import UIKit
import FirebaseDatabase
import FirebaseAuth

import ProgressHUD

class HomeTableViewCell: UITableViewCell {

    @IBOutlet weak var ProfileImageView: UIImageView!
    @IBOutlet weak var PostImageView: UIImageView!
    @IBOutlet weak var LabelName: UILabel!
    @IBOutlet weak var LikeImageView: UIImageView!
    @IBOutlet weak var CommentImageView: UIImageView!
    @IBOutlet weak var LikeCount: UIButton!
    @IBOutlet weak var CaptionLabel: UILabel!
    
    var homeVC : HomeViewController?
    var postRef : DatabaseReference!
    
    var post: Post? {
        didSet {
            updateView()
        }
    }
    
    var user: User? {
        didSet {
            setUserInfo()
            
        }
    }

    func updateView() {
        CaptionLabel.text = post?.caption
        if let photoUrlString = post?.photoUrl {
            let photoUrl = URL(string: photoUrlString)
            PostImageView?.sd_setImage(with: photoUrl)
            
        }
        API.Post.Ref_posts.child(post!.id!).observeSingleEvent(of: .value) { (snapshot) in
            if let dict = snapshot.value as? [String : Any ] {
                let post = Post.TransformPostPhoto(dict: dict, key: snapshot.key)
               self.updateLike(post: post)
            }
        }
        API.Post.Ref_posts.child(post!.id!).observe(.childChanged) { (snapshot) in
            if let value = snapshot.value as? Int {
                self.LikeCount.setTitle("\(value) likes", for: UIControlState.normal)
            }
        }
      //  setUserInfo()
    }
    
       func updateLike(post : Post){
        
       let imageName = post.likes == nil || !post.isLiked! ? "likeme" : "likeisdone"
       LikeImageView.image = UIImage(named : imageName)
        
        guard let count = post.LikeCount else {
            return
        }
        if count  != 0 {
            LikeCount.setTitle("\(count) likes", for : UIControlState.normal)
        } else {
            LikeCount.setTitle("Like me", for: UIControlState.normal)
        }
    }
    
    func setUserInfo(){
        LabelName.text = user?.Username
        if let photoUrlString = user?.profilePicture {
            let photoUrl = URL(string: photoUrlString)
            ProfileImageView.sd_setImage(with: photoUrl, placeholderImage: UIImage(named: "placeholderImg"))
        }
    }
    
    override func prepareForReuse() {
        super.prepareForReuse()
        ProfileImageView.image =  UIImage(named: "placeholderImg")
    }
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        LabelName.text = ""
        CaptionLabel.text = ""
        let TapGesture = UITapGestureRecognizer(target: self, action: #selector(self.CommentImageView_Btn))
        CommentImageView.addGestureRecognizer(TapGesture)
        CommentImageView.isUserInteractionEnabled = true
        
        let TapGestureLikeImageView = UITapGestureRecognizer(target: self, action: #selector(self.LikeImageView_Btn))
        LikeImageView.addGestureRecognizer(TapGestureLikeImageView)
        LikeImageView.isUserInteractionEnabled = true
        
    }

    @objc func LikeImageView_Btn() {
   
        postRef = API.Post.Ref_posts.child(post!.id!)
        incrementLikes(forRef: postRef)
        
        
    }
    
    func incrementLikes(forRef ref: DatabaseReference){
        ref.runTransactionBlock({ (currentData: MutableData) -> TransactionResult in
            if var post = currentData.value as? [String : AnyObject], let uid = Auth.auth().currentUser?.uid {
                var likes: Dictionary<String, Bool>
                likes = post["Likes"] as? [String : Bool] ?? [:]
                var LikeCount = post["LikeCount"] as? Int ?? 0
                if let _ = likes[uid] {
                    LikeCount -= 1
                    likes.removeValue(forKey: uid)
                } else {
                    LikeCount += 1
                    likes[uid] = true
                }
                post["LikeCount"] = LikeCount as AnyObject?
                post["Likes"] = likes as AnyObject?
                
                currentData.value = post
                
                return TransactionResult.success(withValue: currentData)
            }
            return TransactionResult.success(withValue: currentData)
        }) { (error, committed, snapshot) in
            if let error = error {
                print(error.localizedDescription)
            }
            if let dict = snapshot?.value as? [String : Any ] {
                let post = Post.TransformPostPhoto(dict: dict, key: snapshot!.key)
                self.updateLike(post: post)
            }
        }
    }
    
    @objc func CommentImageView_Btn() {
        print("CommentImageView_Btn")
        if let id = post?.id {
            homeVC?.performSegue(withIdentifier: "CommentSegue", sender: id)

        }
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

    }

}
