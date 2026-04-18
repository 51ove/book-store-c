import { useEffect, useState } from "react"
import { BookDetail, BookReviewItem, BookReviewItemWrite } from "../models/book.model"
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { addBookReview, fetchBookReview } from "@/api/review.api";
import { useToast } from "./useToast";

// 서버 데이터를 로컬 state로 복사해서 사용

export const useBook = (bookId : string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const [cartAdded, setCartAdded] = useState(false);
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    
    const {isLoggedIn} = useAuthStore();
    const {showAlert} = useAlert();
    const {showToast} = useToast();

    const likeToggle = ()=>{
        // 권한 확인
        if(!isLoggedIn) {
            showAlert('로그인이 필요합니다.');
            return;
        }

        if (!book) return;

        if (book.liked) {
            // 라이크 상태 -> 언라이크 실행
            unlikeBook(book.id).then(()=> {
                setBook({
                    ...book,
                    liked: false,
                    likes: book.likes - 1,
                })
                showToast("좋아요 취소했습니다");
            })
        } else {
            // 언라이크 상태 -> 라이크 실행
            likeBook(book.id).then(()=>{
                // 성공 처리
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1,
                })
                showToast("좋아요 성공했습니다");
            })
        }
    };

    const addToCart = (quantity: number)=>{
        if (!book) return;
        // api 요청
        addCart({
            book_id: book.id,
            quantity: quantity
        }).then(()=>{
            // showAlert("장바구니에 추가되었습니다.");
            setCartAdded(true);
            setTimeout(()=>{
                setCartAdded(false);
            }, 3000)
        })
    }

    useEffect(()=>{
        if (!bookId) return;

        fetchBook(bookId).then((book)=>{
            setBook(book);
        });

        fetchBookReview(bookId).then((reviews)=>{
            setReviews(reviews);
        })
    }, [bookId]);

    const addReview = (data: BookReviewItemWrite) => {
        if (!book) return;

        addBookReview(book.id.toString(), data).then((res)=> {
            // fetchBookReview(book.id.toString()).then((reviews)=>{
            //     setReviews(reviews);
            // })
            showAlert(res.message);
        })
    }

    return {book, likeToggle, addToCart, cartAdded, reviews, addReview };
}